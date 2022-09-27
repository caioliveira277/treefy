export type PaginationRequest = {
  pagination?: {
    page?: number;
    size?: number;
  };
};

export type ImageRequest = {
  data: {
    id: number;
    attributes: {
      url: string;
    };
  };
};

type CategoriesRequest = {
  data: {
    id: number;
    attributes: {
      title: string;
      image: ImageRequest;
      createdAt: Date;
      updatedAt: Date;
    };
  }[];
};

export type ArticleRequest = {
  data: {
    id: number;
    attributes: {
      title: string;
      description: string;
      content?: string;
      banner: ImageRequest;
      thumbnail: ImageRequest;
      publishedAt: Date;
      categories: CategoriesRequest;
      updatedBy: {
        data: {
          attributes: {
            firstname: string;
            lastname: string;
            createdAt: Date;
          };
        };
      };
    };
    feedbacks: {
      averageRatings: number | null;
    };
  };
};

export type ArticlesRequest = {
  data: ArticleRequest['data'][];
};

export type FeedbackRequest = {
  data: {
    id: number;
    attributes: {
      ratingPoints: number;
    };
  };
};

export type FeedbacksRequest = {
  data: FeedbackRequest['data'][];
};
