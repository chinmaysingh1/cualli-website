export interface UnmetNeedStatistic {
  label: string
  title: string
  description: string
  value: string
  unit: '%' | '+'
  approximate?: boolean
  scope: string
  status: string
  context: string
  source?: { label: string; href: string }
}

export const unmetNeedStatistics: UnmetNeedStatistic[] = [
  {
    label: '01 / HUMAN EXPOSURE',
    title: 'Exposure reaches people.',
    description:
      'PFAS detection has been reported across a large share of the U.S. population.',
    value: '97',
    unit: '%',
    approximate: true,
    scope: 'Population detection estimate',
    status: 'Provisional · verification pending',
    context:
      'The supplied Cualli brief cites both 97% and 98%. The source, sampling period, compounds measured, and population must be reconciled before treating this as an established estimate.',
  },
  {
    label: '02 / DRINKING WATER',
    title: 'The water connects us.',
    description:
      'A USGS study estimated that at least one of the PFAS it measured could be present in approximately 45% of U.S. tap water.',
    value: '45',
    unit: '%',
    scope: 'Estimated U.S. tap water occurrence',
    status: 'Study estimate · USGS, 2023',
    context:
      'A modeled national estimate for the PFAS measured in the study, covering public supplies and private wells. It is not a finding that every water source was tested or that all PFAS were measured.',
    source: {
      label: 'USGS · Tap water study, 2023',
      href: 'https://www.usgs.gov/news/national-news-release/tap-water-study-detects-pfas-forever-chemicals-across-us',
    },
  },
  {
    label: '03 / MILITARY INSTALLATIONS',
    title: 'A challenge across sites.',
    description:
      "Cualli's research materials identify hundreds of military installations affected by PFAS contamination concerns.",
    value: '700',
    unit: '+',
    scope: 'Sites identified for assessment',
    status: 'Scope-qualified · source review',
    context:
      'The defense inventory includes active installations, former sites, and National Guard facilities requiring assessment for PFAS use or potential release. This is not a count of confirmed contamination at every site.',
    source: {
      label: 'Defense PFAS program · Cleanup inventory',
      href: 'https://www.acq.osd.mil/eie/eer/ecc/pfas/data/cleanup-pfas.html',
    },
  },
]

export const unmetNeedScience = [
  {
    label: '01',
    title: 'Chemical persistence',
    description:
      'Many PFAS resist environmental degradation because of their chemical structure, including strong carbon-fluorine bonds.',
  },
  {
    label: '02',
    title: 'Human exposure',
    description:
      'Exposure can occur through contaminated water, food, dust, and certain occupational environments. Some PFAS are eliminated slowly and may accumulate with repeated exposure.',
  },
  {
    label: '03',
    title: 'Health concerns',
    description:
      'Exposure to certain PFAS has been associated with increased risks of specific cancers, immune effects, changes in cholesterol, and reproductive or developmental outcomes.',
  },
] as const
