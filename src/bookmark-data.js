/**
 * Bookmark Data Structure
 * Contains all bookmark folders and validation logic
 */

export const bookmarkData = {
  folders: [
    {
      id: "news",
      name: "News",
      icon: "fa-newspaper",
      bookmarks: [
        {
          name: "Business Standard",
          url: "https://www.business-standard.com/",
          icon: "fa-briefcase",
        },
        {
          name: "Livemint",
          url: "https://www.livemint.com/news",
          icon: "fa-newspaper",
        },
        {
          name: "Economic Times",
          url: "https://economictimes.indiatimes.com/",
          icon: "fa-chart-line",
        },
        {
          name: "Moneycontrol",
          url: "https://www.moneycontrol.com/",
          icon: "fa-indian-rupee-sign",
        },
        {
          name: "CNBC-TV18",
          url: "https://www.cnbctv18.com/",
          icon: "fa-tv",
        },
        {
          name: "HT",
          url: "https://www.hindustantimes.com/business",
          icon: "fa-landmark",
        },
        {
          name: "Hindu",
          url: "https://www.thehindubusinessline.com/",
          icon: "fa-scale-balanced",
        },
        {
          name: "Zee",
          url: "https://www.zeebiz.com/",
          icon: "fa-bullhorn",
        },
        {
          name: "ET Now",
          url: "https://www.etnownews.com/",
          icon: "fa-broadcast-tower",
        },
        {
          name: "BW Businessworld",
          url: "https://www.businessworld.in/",
          icon: "fa-network-wired",
        },
        {
          name: "News18",
          url: "https://www.news18.com/business/",
          icon: "fa-rss",
        },
        {
          name: "India Today",
          url: "https://www.indiatoday.in/business",
          icon: "fa-lightbulb",
        },
        {
          name: "Financial Express",
          url: "https://www.financialexpress.com/",
          icon: "fa-receipt",
        },
        {
          name: "Business Today",
          url: "https://www.businesstoday.in/",
          icon: "fa-clipboard-list",
        },
        { name: "FT", url: "https://www.ft.com/", icon: "fa-globe" },
        {
          name: "NYT",
          url: "https://www.nytimes.com/international/",
          icon: "fa-book-open",
        },
        { name: "WSJ", url: "https://www.wsj.com/", icon: "fa-pen-nib" },
        {
          name: "Economist",
          url: "https://www.economist.com/",
          icon: "fa-landmark-dome",
        },
        {
          name: "Bloomberg",
          url: "https://www.bloomberg.com/",
          icon: "fa-building-columns",
        },
        {
          name: "Reuters",
          url: "https://www.reuters.com/",
          icon: "fa-signal",
        },
        {
          name: "Nikkei Asia",
          url: "https://asia.nikkei.com/",
          icon: "fa-earth-asia",
        },
        { name: "Fortune", url: "https://fortune.com/", icon: "fa-star" },
        {
          name: "Forbes",
          url: "https://www.forbes.com/",
          icon: "fa-user-tie",
        },
        {
          name: "MarketWatch",
          url: "https://www.marketwatch.com/",
          icon: "fa-eye",
        },
        {
          name: "Barron's",
          url: "https://www.barrons.com/",
          icon: "fa-scroll",
        },
        {
          name: "BI",
          url: "https://www.businessinsider.com/",
          icon: "fa-user-secret",
        },
        { name: "Quartz", url: "https://qz.com/", icon: "fa-droplet" },
        {
          name: "Axios Markets",
          url: "https://www.axios.com/markets",
          icon: "fa-circle-info",
        },
        {
          name: "Statista News",
          url: "https://www.statista.com/topics/996/markets/",
          icon: "fa-chart-pie",
        },
        {
          name: "Morning Brew",
          url: "https://www.morningbrew.com/",
          icon: "fa-mug-hot",
        },
      ],
    },
    {
      id: "tools",
      name: "Tools",
      icon: "fa-toolbox",
      bookmarks: [
        {
          name: "Gmail1",
          url: "https://mail.google.com/mail/u/0/",
          icon: "fa-envelope",
        },
        {
          name: "Gmail2",
          url: "https://mail.google.com/mail/u/1/",
          icon: "fa-envelope",
        },
        {
          name: "Gmail3",
          url: "https://mail.google.com/mail/u/2/",
          icon: "fa-envelope",
        },
        {
          name: "G Sheets",
          url: "https://docs.google.com/spreadsheets/u/0/",
          icon: "fa-table",
        },
        {
          name: "G News",
          url: "https://news.google.com",
          icon: "fa-newspaper",
        },
        {
          name: "Spotify",
          url: "https://open.spotify.com/",
          icon: "fa-music",
        },
        {
          name: "Moodist",
          url: "https://moodist.app",
          icon: "fa-face-smile",
        },
        {
          name: "ChatGPT",
          url: "https://chat.openai.com/",
          icon: "fa-robot",
        },
        {
          name: "NotebookLM",
          url: "https://notebooklm.google.com/",
          icon: "fa-book",
        },
        {
          name: "Gemini",
          url: "https://gemini.google.com/",
          icon: "fa-gem",
        },
        {
          name: "Perplexity",
          url: "https://www.perplexity.ai/",
          icon: "fa-question-circle",
        },
        {
          name: "Discord",
          url: "https://discord.com/channels/@me",
          icon: "fa-discord",
        },
        {
          name: "InData",
          url: "https://ourworldindata.org/",
          icon: "fa-mug-hot",
        },
        {
          name: "Screener.in",
          url: "https://www.screener.in/",
          icon: "fa-chart-line",
        },
        {
          name: "NSE India",
          url: "https://www.nseindia.com/",
          icon: "fa-indian-rupee-sign",
        },
        {
          name: "Github",
          url: "https://github.com/pradyumnac?tab=repositories",
          icon: "fa-github",
        },
      ],
    },
    {
      id: "content",
      name: "Content",
      icon: "fa-book-open",
      bookmarks: [
        {
          name: "C: VP Forum",
          url: "https://forum.valuepickr.com/",
          icon: "fa-users",
        },
        {
          name: "NW: H Marks",
          url: "https://www.oaktreecapital.com/insights/memo",
          icon: "fa-chalkboard-user",
        },
        {
          name: "C: Asan",
          url: "https://www.facebook.com/groups/147164928687742",
          icon: "fa-users",
        },
        {
          name: "NW: Congruence",
          url: "https://www.congruenceadvisors.com/",
          icon: "fa-chalkboard-user",
        },
        {
          name: "NW: Buggy",
          url: "https://buggyhuman.substack.com/",
          icon: "fa-chalkboard-user",
        },
        {
          name: "X: Buggy",
          url: "https://x.com/SridharanAnand",
          icon: "fa-twitter",
        },
        {
          name: "NW: Sangeet",
          url: "https://platforms.substack.com/",
          icon: "fa-chalkboard-user",
        },
        {
          name: "NW: Surgecap",
          url: "https://surgecapital.substack.com/",
          icon: "fa-envelope-open-text",
        },
        {
          name: "NW: FinshotsD",
          url: "https://www.finshots.in/archive",
          icon: "fa-envelope-open-text",
        },
        {
          name: "NW: FinshotsM",
          url: "https://www.finshots.in/markets",
          icon: "fa-envelope-open-text",
        },
        {
          name: "NW: TD Brief",
          url: "https://thedailybrief.zerodha.com/",
          icon: "fa-envelope-open-text",
        },
        {
          name: "CS: Varsity",
          url: "https://www.zerodha.com/varsity/",
          icon: "fa-school",
        },
        {
          name: "NW: Pattu",
          url: "https://www.freefincal.com/",
          icon: "fa-envelope-open-text",
        },
        {
          name: "NW: S Niveshak",
          url: "https://www.safalniveshak.com/",
          icon: "fa-envelope-open-text",
        },
        {
          name: "NW: FS",
          url: "https://fs.blog/",
          icon: "fa-envelope-open-text",
        },
        {
          name: "NW: S Bakshi",
          url: "https://fundooprofessor.wordpress.com/",
          icon: "fa-chalkboard-user",
        },
        {
          name: "B: Z Axioms",
          url: "https://drive.google.com/file/d/1gfCtXEWWvHlVOSo8qQLZL5fj2dY44iCM/view?usp=sharing",
          icon: "fa-chalkboard-user",
        },
        {
          name: "NW: N Sleep",
          url: "https://drive.google.com/file/d/1qYksxZzFhKGPya2ykD3L2RYYVgPoRlF1/view?usp=sharing",
          icon: "fa-chalkboard-user",
        },
        {
          name: "NW: OSS Investor",
          url: "https://opensourceinvestor.substack.com/",
          icon: "fa-envelope-open-text",
        },
      ],
    },
  ],
  stickyBookmarks: [],

  /**
   * Validates that no 2nd level nesting exists in the bookmark structure
   * @returns {boolean} true if valid
   * @throws {Error} if nested folder or bookmarks property found
   */
  validateNoNestedFolders() {
    for (const folder of this.folders) {
      if (folder.bookmarks) {
        for (const bookmark of folder.bookmarks) {
          if (bookmark.folders || bookmark.bookmarks) {
            throw new Error(
              `Invalid data: Nested folder detected in "${folder.name}". 2nd level nesting is not allowed.`
            );
          }
        }
      }
    }
    return true;
  },
};

export default bookmarkData;
