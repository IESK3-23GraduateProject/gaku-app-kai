import React from "react";
import { useStore } from "@nanostores/react";
import { getFilteredItems, searchQuery, selectedCategory, sortOption } from "@/lib/newsSearchStore";

interface NewsItem {
    student_news_id: number;
    title: string;
    news_category_name: string;
    news_contents: string;
    author_name: string;
    is_public:boolean;
    high_priority:boolean;
    publish_at:string;
    created_at:string;
    updated_at:string;
    read_at:string;
    is_read:boolean;
  }

interface InfoSectionProps {
    items: NewsItem[];
}

const InfoSection: React.FC<InfoSectionProps> = ({ items }) => {
    const filteredItems = getFilteredItems(items);
    const query = useStore(searchQuery);
    const category = useStore(selectedCategory);
    const sort = useStore(sortOption);

    return (
        <>
            <div className="py-4">
                <p className="text-sm text-red-400">
                    Showing {filteredItems.length} results for query: <strong>{query}</strong>, category: <strong>{category || "All"}</strong>, sort by: <strong>{sort}</strong>
                </p>
            </div>
            <ol
                className="grid -mx-2 sm:-mx-4 py-4 lg:py-6 lg:pb-20 grid-cols-1 max-w-screen-xl"
                id="items-container"
            >
                {filteredItems.length > 0 ? (
                    filteredItems.map((item) => (
                        <div
                            key={item.student_news_id} // Unique key for each item
                            className="col-span-10 px-2 sm:px-4 [&_a]:last:border-none"
                        >
                            <a
                                href={`/news/${item.student_news_id}`}
                                className="group flex flex-col lg:grid lg:grid-cols-12 w-full py-2 sm:py-4 h-full border-b"
                            >
                                <div className="lg:col-span-9 px-2">
                                    <h3 className="text-foreground text-sm lg:text-base group-hover:underline">
                                        {item.title}
                                    </h3>
                                    <p className="hidden lg:block text-xs text-muted-foreground mt-2 max-w-xl">
                                        {item.news_contents}
                                    </p>
                                </div>
                                <div className="lg:col-span-3 flex justify-start gap-1 w-full text-xs mt-2 lg:mt-0">
                                    <div className="text-foreground-lighter group-hover:text-foreground-light min-w-fit">
                                        <div className="inline-flex items-center whitespace-nowrap rounded-full bg-opacity-10 bg-surface-200 text-foreground-light border border-strong px-2.5 py-0.5 text-xs group-hover:border-foreground-muted capitalize">
                                            {item.news_category_name}
                                        </div>
                                    </div>
                                    <p className="text-foreground-lighter group-hover:text-foreground-light whitespace-nowrap lg:ml-auto">
                                        {item.publish_at}
                                    </p>
                                </div>
                            </a>
                        </div>
                    ))
                ) : (
                    <p className="text-muted-foreground text-center">No results found.</p>
                )}
            </ol>
        </>
    );
};

export default InfoSection;
