import {
  ApiError,
  createApiError,
  getApiErrorDetail,
} from './errors';

const FALLBACK_MESSAGE = 'Fallback error message.';

const createJsonResponse = (body: unknown) =>
  new Response(JSON.stringify(body), {
    status: 400,
  });

describe('getApiErrorDetail', () => {
  it('returns the trimmed response detail when it is available', async () => {
    await expect(
      getApiErrorDetail(
        createJsonResponse({
          detail: '  Claim amount is invalid  ',
        }),
        FALLBACK_MESSAGE
      )
    ).resolves.toEqual({
      isFallback: false,
      message: 'Claim amount is invalid',
    });
  });

  it('returns the fallback message when detail is missing', async () => {
    await expect(
      getApiErrorDetail(
        createJsonResponse({
          error_code: 'invalid_claim_amount',
        }),
        FALLBACK_MESSAGE
      )
    ).resolves.toEqual({
      isFallback: true,
      message: FALLBACK_MESSAGE,
    });
  });

  it('returns the fallback message when detail is not a string', async () => {
    await expect(
      getApiErrorDetail(
        createJsonResponse({
          detail: ['invalid_claim_amount'],
        }),
        FALLBACK_MESSAGE
      )
    ).resolves.toEqual({
      isFallback: true,
      message: FALLBACK_MESSAGE,
    });
  });

  it('returns the fallback message when the response body is invalid JSON', async () => {
    await expect(
      getApiErrorDetail(
        new Response('not-json', {
          status: 500,
        }),
        FALLBACK_MESSAGE
      )
    ).resolves.toEqual({
      isFallback: true,
      message: FALLBACK_MESSAGE,
    });
  });
});

describe('createApiError', () => {
  it('creates an ApiError using the response detail', async () => {
    const error = await createApiError(
      createJsonResponse({
        detail: 'Owner email is invalid',
      }),
      FALLBACK_MESSAGE
    );

    expect(error).toBeInstanceOf(ApiError);
    expect(error.name).toBe('ApiError');
    expect(error.message).toBe('Owner email is invalid');
    expect(error.isFallback).toBe(false);
  });

  it('creates an ApiError using the fallback message', async () => {
    const error = await createApiError(
      createJsonResponse({
        detail: '',
      }),
      FALLBACK_MESSAGE
    );

    expect(error).toBeInstanceOf(ApiError);
    expect(error.name).toBe('ApiError');
    expect(error.message).toBe(FALLBACK_MESSAGE);
    expect(error.isFallback).toBe(true);
  });
});
