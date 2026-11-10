export type Founder = {
  name: string
  role: string
  imageSrc?: string
  linkedinUrl: string
}

export const founders: readonly Founder[] = [
  {
    name: 'Osvaldo Linares Gutiérrez',
    role: 'Co-founder / CEO',
    imageSrc: '/images/founders/osvaldo.png',
    linkedinUrl: 'https://www.linkedin.com/in/osvaldo-linares-g-3508442b0/',
  },
  {
    name: 'Jinghan (Alex) Li',
    role: 'Co-founder / CTO',
    imageSrc: '/images/founders/jinghan.png',
    linkedinUrl: 'https://www.linkedin.com/in/jinghan-li-064a742a8/',
  },
  {
    name: 'Chinmay Singh',
    role: 'Co-founder / CFO',
    imageSrc: '/images/founders/chinmay.png',
    linkedinUrl: 'https://www.linkedin.com/in/chinmayksingh/',
  },
]
