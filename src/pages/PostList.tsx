import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Search, ChevronDown, Plus } from "lucide-react";
import { usePosts, useUsers } from "@/hooks/use-posts";
import AppLayout from "@/components/AppLayout";
import Pagination from "@/components/Pagination";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

const POSTS_PER_PAGE = 10;

const PostList = () => {
  const { data: posts, isLoading: postsLoading } = usePosts();
  const { data: users } = useUsers();
  const [search, setSearch] = useState("");
  const [authorFilter, setAuthorFilter] = useState<number | null>(null);
  const [page, setPage] = useState(1);
  const [authorOpen, setAuthorOpen] = useState(false);

  const filtered = useMemo(() => {
    if (!posts) return [];
    return posts.filter((p) => {
      const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase());
      const matchesAuthor = authorFilter ? p.userId === authorFilter : true;
      return matchesSearch && matchesAuthor;
    });
  }, [posts, search, authorFilter]);

  const totalPages = Math.ceil(filtered.length / POSTS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE);

  const getUserName = (userId: number) =>
    users?.find((u) => u.id === userId)?.name ?? `User ${userId}`;

  return (
    <AppLayout>
      <div className="flex flex-1 flex-col rounded-[16px] bg-white/75 backdrop-blur-[8px] overflow-hidden shadow-xl border border-white/20">
        {/* Content Header */}
        {/* <div className="flex items-center justify-between bg-white/40 px-8 py-6 border-b border-black/5">
          <h1 className="text-2xl font-bold text-foreground">Posts</h1>
          <Link
            to="/create"
            className="flex items-center gap-2 text-sm font-semibold text-foreground hover:opacity-60 transition-all"
          >
            <Plus size={18} />
            Create a new post
          </Link>
        </div> */}

        {/* Filters */}
        <div className="flex items-center gap-4 px-8 py-6 bg-transparent">
          <div className="relative flex-1">
            <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-black/40" />
            <input
              type="text"
              placeholder="Search posts by title..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              className="w-full rounded-[12px] bg-black/10 py-4 pl-12 pr-4 text-base placeholder:text-black/40 outline-none focus:bg-black/[0.15] transition-all"
            />
          </div>
          <div className="relative">
            <button
              onClick={() => setAuthorOpen(!authorOpen)}
              className="flex items-center gap-2 rounded-[12px] bg-black/10 px-6 py-4 text-base font-medium min-w-[220px] justify-between hover:bg-black/[0.15] transition-all"
            >
              <span>{authorFilter ? getUserName(authorFilter) : "All Authors"}</span>
              <ChevronDown size={20} className="text-black/40" />
            </button>
            {authorOpen && (
              <div className="absolute right-0 top-full mt-2 z-50 w-full rounded-xl bg-white/95 backdrop-blur-md shadow-2xl border border-black/5 py-2 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                <button
                  onClick={() => { setAuthorFilter(null); setAuthorOpen(false); setPage(1); }}
                  className="w-full px-5 py-3 text-left text-sm font-medium hover:bg-black/5 transition-colors"
                >
                  All Authors
                </button>
                {users?.map((u) => (
                  <button
                    key={u.id}
                    onClick={() => { setAuthorFilter(u.id); setAuthorOpen(false); setPage(1); }}
                    className="w-full px-5 py-3 text-left text-sm hover:bg-black/5 transition-colors"
                  >
                    {u.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Post List */}
        <div className="flex-1 px-8">
          {postsLoading ? (
            <div className="space-y-4 py-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-20 w-full rounded-xl bg-black/5" />
              ))}
            </div>
          ) : (
            <div className="divide-y divide-black/5">
              {paginated.map((post) => (
                <Link
                  key={post.id}
                  to={`/posts/${post.id}`}
                  className="group flex items-center justify-between py-6 hover:translate-x-1 transition-all"
                >
                  <div className="flex-1">
                    <h2 className="text-lg font-bold text-foreground capitalize group-hover:text-black/70">
                      {post.title}
                    </h2>
                    <p className="text-sm text-black/40 mt-1 font-medium">
                      by {getUserName(post.userId)}
                    </p>
                  </div>
                </Link>
              ))}
              {paginated.length === 0 && (
                <p className="py-20 text-center text-black/40 font-medium">No posts found.</p>
              )}
            </div>
          )}
        </div>

        {/* Pagination Implementation */}
        {totalPages > 1 && (
          <Pagination 
            currentPage={page} 
            totalPages={totalPages} 
            onPageChange={setPage} 
          />
        )}
      </div>
    </AppLayout>
  );
};

export default PostList;