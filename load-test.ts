// import necessary modules
import { check } from 'k6'
import http from 'k6/http'
import { Response } from 'k6/http'

// define interfaces
interface Options {
  thresholds: {
    http_req_failed: string[],
    http_req_duration: string[],
  },
  vus: number,
  duration: string
}

interface ResponseCheck {
  'response code was 200': (res: Response) => boolean
  'status is 200': (r: Response) => boolean
  'response time < 200ms': (r: Response) => boolean
}

// define configuration
export const options: Options = {
  thresholds: {
    http_req_failed: ['rate<0.01'],
    http_req_duration: ['p(99)<1000'],
  },
  vus: 10,  // Number of virtual users
  duration: '30s'  // Test duration
}

export default function () {
  // define URL for posts
  const url: string = 'http://localhost:80/api/posts'

  // send a get request and save response
  const res: Response = http.get(url)

  // check that response is 200
  const checkers: ResponseCheck = {
    'response code was 200': (res: Response) => res.status == 200,
    'status is 200': (r: Response) => r.status === 200,
    'response time < 200ms': (r: Response) => r.timings.duration < 200
  }
  check(res, checkers)
}
