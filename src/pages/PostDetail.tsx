import { useParams, Link } from "react-router-dom";
import { ArrowLeft, User, Calendar } from "lucide-react";
import { usePost, useUsers, useComments } from "@/hooks/use-posts";
import AppLayout from "@/components/AppLayout";
import { Skeleton } from "@/components/ui/skeleton";
import mountainBg from "@/assets/mountain-bg.jpg";

const PostDetail = () => {
  const { id } = useParams<{ id: string }>();
  const postId = Number(id);
  const { data: post, isLoading } = usePost(postId);
  const { data: users } = useUsers();
  const { data: comments, isLoading: commentsLoading } = useComments(postId);

  const author = users?.find((u) => u.id === post?.userId);

  if (isLoading) {
    return (
      <AppLayout>
        <div className="max-w-[1200px] mx-auto">
          <Skeleton className="h-[900px] w-full rounded-[16px]" />
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      {/* Main Container: Fixed width 1200px as per Figma */}
      <div className="max-w-[1200px] mx-auto flex flex-col rounded-[16px] overflow-hidden shadow-xl">
        
        {/* Hero Section: 412px height */}
        <div 
          className="relative flex flex-col justify-end items-start p-[24px] gap-[16px] w-full h-[412px]"
          style={{ 
            backgroundImage: `linear-gradient(0deg, rgba(33, 96, 154, 0.75) 0%, rgba(0, 37, 74, 0.75) 100%), url(${mountainBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          {/* Back Button */}
          <Link
            to="/"
            className="absolute top-6 left-6 flex items-center gap-2 bg-white px-5 py-2 rounded-full text-[#333] hover:bg-gray-100 transition-all text-sm font-bold shadow-md"
          >
            <ArrowLeft size={16} />
            Back to Posts
          </Link>

          {/* Post Header Info */}
          <div className="flex flex-col gap-4 max-w-[90%]">
            <h1 className="text-4xl font-bold text-white capitalize leading-tight">
              {post?.title}
            </h1>
            
            <div className="flex items-center gap-6 text-white/90 text-sm font-semibold">
              <div className="flex items-center gap-2">
                <User size={18} className="text-white/70" />
                <span>{author?.name ?? "Leanne Graham"}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={18} className="text-white/70" />
                <span>Sun, August 24th, 2025</span>
              </div>
            </div>
          </div>
        </div>

        {/* Details Section: Min-height 489px, Glassmorphism style */}
        <div className="flex flex-col p-[24px] gap-[24px] w-full min-h-[489px] bg-white/75 backdrop-blur-[8px]">
          <div className="flex flex-col gap-6">
            <p className="text-lg leading-relaxed text-slate-800 font-normal">
              {post?.body}
            </p>
            <p className="text-lg leading-relaxed text-slate-800 font-normal">
              {post?.body}
            </p>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default PostDetail;