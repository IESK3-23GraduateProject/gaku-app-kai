import { atom } from "nanostores";
import { supabase } from "@/lib/supabase";

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

export const newsItems = atom<NewsItem[]>([]);

// Fetch the data using the RPC
export const fetchNewsItems = async () => {
  try {
    const userId = 2240002;
    const { data, error } = await supabase.rpc("get_student_news", {
      p_student_user_id: userId,
    });

    if (error) {
      console.error("Error fetching student news:", error);
      return;
    }

    // Update the store with the RPC data
    newsItems.set(data || []);
  } catch (error) {
    console.error("Unexpected error fetching student news:", error);
  }
};

// Function to subscribe to Supabase realtime updates
export const subscribeToRealtimeUpdates = () => {
  const channel = supabase
    .channel("student-news-updates")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "student_news" },
      async () => {
        console.log(
          "Detected change in student-news table. Fetching new data..."
        );
        await fetchNewsItems(); // Refetch data when a change occurs
      }
    )
    .subscribe();

  return channel; // Return the channel for cleanup
};
