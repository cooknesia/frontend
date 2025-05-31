"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAuth } from "@/context/auth-context";
import { useFoodsStore } from "@/store/use-foods";
import { Loader2, Star } from "lucide-react";
import { useParams } from "next/navigation";

export default function RatingDialog() {
  const {
    isRatingDialogOpen,
    closeRatingDialog,
    rating,
    setRating,
    hover,
    setHover,
    submitted,
    isRatingLoading,
    submitRating,
  } = useFoodsStore();

  const { id } = useParams();
  const { user, token } = useAuth();

  const handleRating = (value) => {
    if (!isRatingLoading) setRating(value);
  };

  return (
    <Dialog open={isRatingDialogOpen} onOpenChange={closeRatingDialog}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Beri Rating Resep</DialogTitle>
          <DialogDescription>
            Bagaimana pendapat Anda tentang resep ini? Berikan rating untuk
            membantu pengguna lain.
          </DialogDescription>
        </DialogHeader>

        {submitted ? (
          <div className="py-6 flex flex-col items-center justify-center">
            <div className="text-green-500 text-xl font-medium mb-2">
              Terima Kasih!
            </div>
            <p className="text-center text-gray-600">
              Rating Anda telah berhasil disimpan.
            </p>
          </div>
        ) : (
          <>
            <div className="flex justify-center py-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className={`p-1 focus:outline-none ${isRatingLoading ? "cursor-not-allowed" : "cursor-pointer"}`}
                  onClick={() => handleRating(star)}
                  onMouseEnter={() => !isRatingLoading && setHover(star)}
                  onMouseLeave={() => !isRatingLoading && setHover(null)}
                  disabled={isRatingLoading}
                  aria-label={`Rate ${star} stars out of 5`}
                >
                  <Star
                    className={`h-10 w-10 transition-all ${
                      (hover !== null ? star <= hover : star <= (rating || 0))
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    } ${isRatingLoading ? "opacity-50" : ""}`}
                  />
                </button>
              ))}
            </div>

            <DialogFooter className="flex sm:justify-between">
              <Button
                variant="outline"
                onClick={closeRatingDialog}
                disabled={isRatingLoading}
              >
                Batal
              </Button>
              <Button
                onClick={() => submitRating(id, user.id, rating, token)}
                disabled={!rating || isRatingLoading}
                className={
                  !rating || isRatingLoading
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }
              >
                {isRatingLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Mengirim...
                  </>
                ) : (
                  "Kirim Rating"
                )}
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
