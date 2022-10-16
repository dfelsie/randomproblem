export async function getVids(titles: string[]) {
  const retAry: any[] = [];
  for (let i = 0; i < titles.length; i++) {
    const dotLoc = titles[i].indexOf(". ");
    const str = titles[i].slice(dotLoc + 1);
    /* 'https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=3&q=Implement%20Trie%20(Prefix%20Tree)%20leetcode%20solution&key=[YOUR_API_KEY]' \
    --header 'Authorization: Bearer [YOUR_ACCESS_TOKEN]' \
    --header 'Accept: application/json' \
    --compressed */
    //fetch
  }
  return retAry;
}
