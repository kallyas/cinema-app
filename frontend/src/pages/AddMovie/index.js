import React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../../components/common/Input";
import Select from "../../components/common/Select";
import Button from "../../components/common/Button";
import { addMovie } from "../../api/movies";
import { getGenres } from "../../api/genres";
import { getErrorMessage } from "../../lib/api";

const addMovieSchema = z.object({
  title: z.string().min(1, "Title is required."),
  genre: z.string().min(1, "Genre is required."),
  numberInStock: z.coerce.number().min(0, "Number in stock must be at least 0."),
  description: z.string().min(1, "Description is required."),
  image: z
    .any()
    .refine((files) => files?.length === 1, "Cover image is required."),
});

function AddMovieForm() {
  const queryClient = useQueryClient();
  const {
    data: genres = [],
    isLoading,
  } = useQuery({
    queryKey: ["genres"],
    queryFn: getGenres,
  });
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(addMovieSchema),
    defaultValues: {
      title: "",
      genre: "",
      numberInStock: 0,
      description: "",
      image: undefined,
    },
  });

  const addMovieMutation = useMutation({
    mutationFn: addMovie,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["movies"] });
      reset();
    },
  });

  if (isLoading) {
    return (
      <div className="background-container pt-5">
        <div className="container text-white">Loading genres...</div>
      </div>
    );
  }

  return (
    <div className="background-container pt-5">
      <div className="container">
        <h1 className="header">Add a new movie</h1>

        <form
          onSubmit={handleSubmit((values) => addMovieMutation.mutateAsync(values))}
          encType="multipart/form-data"
        >
          <Input
            name="title"
            label="Title"
            placeholder="Enter the title..."
            error={errors.title?.message}
            iconClass="fas fa-film"
            autoFocus
            {...register("title")}
          />

          <Select
            name="genre"
            label="Genre"
            error={errors.genre?.message}
            options={genres}
            iconClass="fas fa-address-card"
            {...register("genre")}
          />

          <Input
            name="numberInStock"
            label="Number In Stock"
            placeholder="Enter numbers the stock..."
            error={errors.numberInStock?.message}
            iconClass="fas fa-hashtag"
            type="number"
            {...register("numberInStock", { valueAsNumber: true })}
          />

          <Input
            name="image"
            label="Cover Image"
            error={errors.image?.message}
            iconClass="fas fa-file-image"
            accept="image/*"
            type="file"
            {...register("image")}
          />

          <Input
            name="description"
            label="Description"
            placeholder="Enter description about this movie..."
            iconClass="fas fa-info"
            error={errors.description?.message}
            type="textarea"
            {...register("description")}
          />

          {addMovieMutation.isError && (
            <p className="bg-info text-white">
              {getErrorMessage(addMovieMutation.error, "Unable to add movie.")}
            </p>
          )}

          {addMovieMutation.isSuccess && (
            <p className="bg-info text-white">Movie added successfully.</p>
          )}

          <Button
            type="submit"
            label="Add Movie"
            disabled={isSubmitting || addMovieMutation.isPending}
          />
        </form>
      </div>
    </div>
  );
}

export default AddMovieForm;
