import { apiFetch } from './client';

describe('apiFetch', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('adds the default JSON accept header', async () => {
    const fetchMock = vi
      .spyOn(globalThis, 'fetch')
      .mockResolvedValue({ ok: true } as Response);

    await apiFetch('/api/cars');

    const [, options] = fetchMock.mock.calls[0];
    const headers = new Headers(options?.headers);

    expect(headers.get('accept')).toBe('application/json');
    expect(headers.get('Content-Type')).toBeNull();
  });

  it('serializes jsonBody and adds the JSON content type header', async () => {
    const fetchMock = vi
      .spyOn(globalThis, 'fetch')
      .mockResolvedValue({ ok: true } as Response);
    const payload = { name: 'Alex' };

    await apiFetch('/api/owners', {
      method: 'POST',
      jsonBody: payload,
    });

    const [, options] = fetchMock.mock.calls[0];
    const headers = new Headers(options?.headers);

    expect(options?.body).toBe(JSON.stringify(payload));
    expect(headers.get('accept')).toBe('application/json');
    expect(headers.get('Content-Type')).toBe('application/json');
  });
});
