import { OAuthRequestError } from '@lucia-auth/oauth'

export async function handleRequest<T>(request: Request) {
  request.headers.set('User-Agent', 'lucia')
  request.headers.set('Accept', 'application/json')

  const response = await fetch(request)

  if (!response.ok) {
    throw new OAuthRequestError(request, response)
  }

  return (await response.json()) as T
}
