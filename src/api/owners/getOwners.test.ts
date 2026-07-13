import { getOwners } from './getOwners';

describe('getOwners', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('adds owner email search params to the request URL', async () => {
    const fetchMock = vi
      .spyOn(globalThis, 'fetch')
      .mockResolvedValue({
        ok: true,
        json: async () => ({
          count: 0,
          items: [],
          next_page: null,
          previous_page: null,
        }),
      } as Response);

    await getOwners({
      driver_license_cat: ['B'],
      email: 'jane@example.com',
      page: 2,
      per_page: 25,
    });

    const requestUrl = new URL(
      fetchMock.mock.calls[0][0] as string,
      'http://localhost'
    );

    expect(requestUrl.pathname).toBe('/api/owners');
    expect(requestUrl.searchParams.get('page')).toBe('2');
    expect(requestUrl.searchParams.get('per_page')).toBe('25');
    expect(requestUrl.searchParams.get('category')).toBe('B');
    expect(requestUrl.searchParams.get('email')).toBe(
      'jane@example.com'
    );
  });
});
