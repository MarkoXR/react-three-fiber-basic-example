import { SatRec, twoline2satrec } from "satellite.js";

export function toSatRecs(rawTles: string): SatRec[]{
    const lines = rawTles.trim().split(/\r?\n/);
    const satRecs: SatRec[] = [];

    for (let i = 0; i < lines.length; i += 3) {
        const line1 = lines[i];
        const line2 = lines[i + 1];
        const line3 = lines[i + 2];

        const satrec = twoline2satrec(line2!, line3!)

        satRecs.push(satrec);
    }

    return satRecs;
}