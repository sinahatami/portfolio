import { deflateSync } from "node:zlib";
import { decodePng } from "@/server/og/png";

/** A PNG from rows of bytes, each row starting with its filter type. */
function png(width: number, height: number, colour: 2 | 6, rows: number[][]) {
  const chunk = (type: string, body: Uint8Array) => {
    const out = Buffer.alloc(12 + body.length);
    out.writeUInt32BE(body.length, 0);
    out.write(type, 4, "latin1");
    Buffer.from(body).copy(out, 8);
    return out; // the CRC is left as zero; the decoder does not check it
  };
  const header = Buffer.alloc(13);
  header.writeUInt32BE(width, 0);
  header.writeUInt32BE(height, 4);
  header[8] = 8;
  header[9] = colour;
  return new Uint8Array(
    Buffer.concat([
      Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
      chunk("IHDR", header),
      chunk("IDAT", deflateSync(Buffer.from(rows.flat()))),
      chunk("IEND", new Uint8Array()),
    ])
  );
}

describe("decodePng", () => {
  it("reads unfiltered RGBA pixels", () => {
    const image = decodePng(
      png(2, 1, 6, [[0, 10, 20, 30, 255, 40, 50, 60, 255]])
    );
    expect(image.width).toBe(2);
    expect(image.height).toBe(1);
    expect([...image.rgba]).toEqual([10, 20, 30, 255, 40, 50, 60, 255]);
  });

  it("undoes the sub, up, average and Paeth filters", () => {
    // Every pixel is (100, 100, 100, 255); each row uses another filter.
    const rows = [
      [1, 100, 100, 100, 255, 0, 0, 0, 0], // sub
      [2, 0, 0, 0, 0, 0, 0, 0, 0], // up
      [3, 50, 50, 50, 128, 0, 0, 0, 0], // average: (left + up) / 2
      [4, 0, 0, 0, 0, 0, 0, 0, 0], // Paeth picks up
    ];
    const image = decodePng(png(2, 4, 6, rows));
    expect([...image.rgba]).toEqual(
      Array.from({ length: 8 }, () => [100, 100, 100, 255]).flat()
    );
  });

  it("expands RGB to RGBA", () => {
    const image = decodePng(png(1, 1, 2, [[0, 1, 2, 3]]));
    expect([...image.rgba]).toEqual([1, 2, 3, 255]);
  });

  it("rejects other files", () => {
    expect(() => decodePng(new Uint8Array([1, 2, 3]))).toThrow("Not a PNG");
  });
});
