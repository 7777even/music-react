export function parsingLyrics(lyricsString) {
    const parsingRegExp = /\[(\d{2}):(\d{2})\.(\d{2,3})\]/;
    // console.log(lyricsString);
    const lineStrings = lyricsString.split("\n");
    // console.log(lineStrings);
    const lyrics = [];
    lineStrings.forEach(item => {
        if (item.trim() !== '') {
            const result = parsingRegExp.exec(item);
            if (result) {
                const time1 = result[1] * 60 * 1000;
                const time2 = result[2] * 1000;
                const time3 = result[3].length === 3 ? result[3] * 1 : result[3] * 10;
                const time = time1 + time2 + time3;
                const content = item.replace(parsingRegExp, "");
                lyrics.push({ time, content });
            }
        }
    });
    return lyrics;
}