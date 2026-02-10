import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { NotebookPen, Info, ChevronDown } from "lucide-react";
import { useUsers, useCreatePost } from "@/hooks/use-posts";
import { useToast } from "@/hooks/use-toast";
import AppLayout from "@/components/AppLayout";

const schema = z.object({
  title: z.string().trim().min(1, "Post title is required").max(200),
  body: z.string().trim().min(1, "Post body is required").max(5000),
  userId: z.number({ required_error: "Please select an author for this post" }).min(1, "Please select an author for this post"),
});

type FormData = z.infer<typeof schema>;

const CreatePost = () => {
  const navigate = useNavigate();
  const { data: users } = useUsers();
  const createPost = useCreatePost();
  const { toast } = useToast();
  const [serverError, setServerError] = useState<string | null>(null);
  const [authorOpen, setAuthorOpen] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { title: "", body: "", userId: undefined as unknown as number },
  });

  const selectedUserId = watch("userId");
  const selectedUser = users?.find((u) => u.id === selectedUserId);

  const onSubmit = (data: { title: string; body: string; userId: number }) => {
    setServerError(null);
    createPost.mutate(data, {
      onSuccess: () => {
        toast({
          title: "Success",
          description: "A new post has been successfully created!",
        });
        navigate("/");
      },
      onError: () => {
        setServerError("Internal Server Error");
      },
    });
  };

  return (
    <AppLayout>
      <div className="flex flex-1 flex-col rounded-2xl bg-white/75 backdrop-blur-sm overflow-hidden">
        {/* Header */}
        <div className="flex items-center gap-[10px] bg-white px-4 py-[18px]">
          <NotebookPen size={28} className="text-foreground" />
          <h1 className="text-xl font-semibold text-foreground">Create a New Post</h1>
        </div>

        {/* Body */}
        <div className="flex flex-1 justify-center p-6">
          <div className="w-full max-w-[848px] rounded-xl bg-white p-6">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-[46px]">
              <div className="flex flex-col gap-6">
                {/* Title */}
                <div className="flex flex-col gap-[10px]">
                  <label className="text-base font-semibold text-foreground">Title</label>
                  <input
                    {...register("title")}
                    placeholder="Enter post title"
                    className="w-full rounded-xl bg-black/10 px-4 py-4 text-base text-foreground placeholder:text-black/40 outline-none"
                  />
                  {errors.title && (
                    <p className="text-sm text-red-600">{errors.title.message}</p>
                  )}
                </div>

                {/* Body */}
                <div className="flex flex-col gap-[10px]">
                  <label className="text-base font-semibold text-foreground">Body</label>
                  <textarea
                    {...register("body")}
                    placeholder="Enter post body"
                    rows={5}
                    className="w-full rounded-xl bg-black/10 px-4 py-4 text-base text-foreground placeholder:text-black/40 outline-none resize-none"
                  />
                  {errors.body && (
                    <p className="text-sm text-red-600">{errors.body.message}</p>
                  )}
                </div>

                {/* Author */}
                <div className="flex flex-col gap-[10px]">
                  <label className="text-base font-semibold text-foreground">Author</label>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setAuthorOpen(!authorOpen)}
                      className="flex w-full items-center justify-between rounded-xl bg-black/10 px-4 py-4 text-base text-foreground outline-none"
                    >
                      <span className={selectedUser ? "text-foreground" : "text-black/40"}>
                        {selectedUser?.name ?? "Select an author"}
                      </span>
                      <ChevronDown size={18} className="text-black/50" />
                    </button>
                    {authorOpen && (
                      <div className="absolute left-0 top-full mt-1 z-50 w-full rounded-xl bg-white shadow-lg border border-black/10 py-1 max-h-[200px] overflow-y-auto">
                        {users?.map((u) => (
                          <button
                            key={u.id}
                            type="button"
                            onClick={() => {
                              setValue("userId", u.id, { shouldValidate: true });
                              setAuthorOpen(false);
                            }}
                            className="w-full px-4 py-2 text-left text-sm hover:bg-black/5"
                          >
                            {u.name}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  {errors.userId && (
                    <p className="text-sm text-red-600">{errors.userId.message}</p>
                  )}
                </div>
              </div>

              {/* Server Error */}
              {serverError && (
                <div className="flex items-center justify-center gap-[6px] rounded-xl border border-red-600 bg-red-50 px-[10px] py-4">
                  <Info size={18} className="text-red-600" />
                  <span className="text-sm text-red-600">{serverError}</span>
                </div>
              )}

              {/* Submit */}
              <div className="flex justify-center">
                <button
                  type="submit"
                  disabled={createPost.isPending}
                  className="rounded-xl bg-[#333] px-16 py-4 text-base text-white hover:bg-[#444] transition-colors disabled:opacity-50"
                >
                  {createPost.isPending ? "Creating..." : "Create Post"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default CreatePost;
