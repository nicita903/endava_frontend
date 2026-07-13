type ApiErrorDetail = {
  isFallback: boolean;
  message: string;
};

export class ApiError extends Error {
  readonly isFallback: boolean;

  constructor(errorDetail: ApiErrorDetail) {
    const message = errorDetail.message;

    super(message);
    this.name = 'ApiError';
    this.isFallback = errorDetail.isFallback;
  }
}

export const getApiErrorDetail = async (
  response: Response,
  fallbackMessage: string
): Promise<ApiErrorDetail> => {
  const fallbackErrorDetail = {
    isFallback: true,
    message: fallbackMessage,
  };

  try {
    const data: unknown = await response.json();

    if (!data || typeof data !== 'object') {
      return fallbackErrorDetail;
    }

    const detail = (data as { detail?: unknown }).detail;

    if (typeof detail !== 'string') {
      return fallbackErrorDetail;
    }

    const trimmedDetail = detail.trim();

    if (!trimmedDetail) {
      return fallbackErrorDetail;
    }

    return {
      isFallback: false,
      message: trimmedDetail,
    };
  } catch {
    return fallbackErrorDetail;
  }
};

export const createApiError = async (
  response: Response,
  fallbackMessage: string
) => new ApiError(await getApiErrorDetail(response, fallbackMessage));

export const getApiErrorMessage = (
  error: unknown,
  fallbackMessage: string
) => {
  if (
    error instanceof ApiError &&
    !error.isFallback &&
    error.message.trim()
  ) {
    return error.message;
  }

  return fallbackMessage;
};
