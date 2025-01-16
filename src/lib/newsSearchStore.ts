// stores/searchStore.ts
import { atom } from "nanostores";

interface NewsItem {
  student_news_id: number;
  title: string;
  news_category_name: string;
  news_contents: string;
  author_name: string;
  is_public: boolean;
  high_priority: boolean;
  publish_at: string;
  created_at: string;
  updated_at: string;
  read_at: string;
  is_read: boolean;
}
export const test = atom<string>("Test atom");
export const searchQuery = atom<string>("");
export const selectedCategory = atom<string>("");
export const sortOption = atom<string>("Relevance");
export const isSearchVisible = atom<boolean>(false);

// Helper function to filter and sort items
export const getFilteredItems = (items: NewsItem[]) => {
  const query = searchQuery.get().toLowerCase();
  const category = selectedCategory.get();
  const sort = sortOption.get();

  let filtered = [...items];

  // Filter by search query
  if (query) {
    filtered = filtered.filter(
      (item) =>
        item.title.toLowerCase().includes(query) ||
        item.news_contents.toLowerCase().includes(query)
    );
  }

  // Filter by category
  if (category && category !== "all") {
    filtered = filtered.filter((item) => {
      switch (category) {
        case "school":
          return item.news_category_name === "学校からの連絡";
        case "teacher":
          return item.news_category_name === "担任からの連絡";
        case "career":
          return item.news_category_name === "キャリアセンターより";
        case "library":
          return item.news_category_name === "図書館からの連絡";
        case "admin":
          return item.news_category_name === "事務局からの連絡";
        case "circle":
          return item.news_category_name === "クラブ・サークル";
        case "other":
          return item.news_category_name === "その他";
        default:
          return true;
      }
    });
  }

  // Sort items
  filtered.sort((a, b) => {
    switch (sort) {
      case "Date (Newest)":
        return (
          new Date(b.publish_at).getTime() - new Date(a.publish_at).getTime()
        );
      case "Date (Oldest)":
        return (
          new Date(a.publish_at).getTime() - new Date(b.publish_at).getTime()
        );
      case "Title (A-Z)":
        return a.title.localeCompare(b.title);
      case "Title (Z-A)":
        return b.title.localeCompare(a.title);
      default:
        return 0;
    }
  });

  return filtered;
};
