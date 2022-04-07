'use strict';

module.exports = [
  [
    {
      views: [
        {
          type: 'cpu',
          limit: 30,
          position: {
            grow: 50,
          },
        },
        {
          type: 'eventLoop',
          limit: 30,
          position: {
            grow: 25,
          },
        },
        {
          type: 'memory',
          position: {
            grow: 25,
          },
        },
      ],
    },
    {
      position: {
        grow: 3,
      },
      views: [
        {
          type: 'log',
          streams: ['stdout stderr'],
          exclude: '^\\[STATUS\\]',
          title: 'Standard Outpput',
        },
        {
          type: 'log',
          streams: ['stderr'],
          exclude: '^\\[STATUS\\]',
          position: {
            size: 15,
          },
        },
        {
          type: 'log',
          title: 'status',
          borderColor: 'light-blue',
          fgColor: '',
          bgColor: '',
          streams: ['stdout', 'stderr'],
          include: '^\\[STATUS\\](.*)',
          position: {
            size: 3,
          },
        },
      ],
    },
  ],
];
