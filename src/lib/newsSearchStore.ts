// stores/searchStore.ts
import { atom } from "nanostores";

interface NewsItem {
  postId: number;
  title: string;
  description: string;
  category: string;
  date: string;
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
        item.description.toLowerCase().includes(query)
    );
  }

  // Filter by category
  if (category && category !== "all") {
    filtered = filtered.filter((item) => {
      switch (category) {
        case "school":
          return item.category === "学校からの連絡";
        case "teacher":
          return item.category === "担任からの連絡";
        case "career":
          return item.category === "キャリアセンターより";
        case "library":
          return item.category === "図書館からの連絡";
        case "admin":
          return item.category === "事務局からの連絡";
        case "circle":
          return item.category === "クラブ・サークル";
        case "other":
          return item.category === "その他";
        default:
          return true;
      }
    });
  }

  // Sort items
  filtered.sort((a, b) => {
    switch (sort) {
      case "Date (Newest)":
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      case "Date (Oldest)":
        return new Date(a.date).getTime() - new Date(b.date).getTime();
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
