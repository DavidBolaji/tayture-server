export class Helper {
  public static extractTitle(text: string): string {
    const regex = /<h1>(.*?)<\/h1>/;
    const match = regex.exec(text);

    if (match) {
      const contentBetweenTags = match[1];
      return contentBetweenTags;
    } else {
      return "No Title";
    }
  }

  public static extractDesc(text: string): string {
    // Use regex to find the first paragraph without an <img> tag
    // const regex = /<p>(?!.*<img.*)(.*?)<\/p>/i;
    const regex = /<p>(?!.*(?:<img.*|<br\s*\/?>))(.*?)<\/p>/i;
    const match = text.match(regex);

    // console.log(match);

    if (match && match[1]) {
      // Extract the first 20 words from the paragraph's content
      const content = match[1];
      const words = content.split(" ").slice(0, 20).join(" ");

      return words;
    } else {
      return "No matching paragraph found.";
    }
  }
}
