import { LinkContentType } from '../../entity/RoadmapModel';

export const monitoring = {
  items: [
    {
      label: 'Monitoramento de Infraestrutura',
      children: [
        { label: 'Prometheus', links: [] },
        { label: 'Nagios', links: [] },
        { label: 'Grafana', links: [] },
        {
          label: 'Zabbix',
          links: [
            {
              label: 'Treinamento base Zabbix 5.0  - Magno Monte Cerqueira',
              url: 'https://www.youtube.com/watch?v=vf5LidtostQ&list=PLCFBm2AvdHoCObUAfon9WL9E1q3C5-UKB',
              contentType: LinkContentType.WATCH,
            },
          ],
        },
        { label: 'Monit', links: [] },
        { label: 'Datadog', links: [] },
      ],
    },
    {
      label: 'Monitoramento de Aplicação',
      children: [
        { label: 'Jaeger', links: [] },
        { label: 'New Relic', links: [] },
        { label: 'AppDynamics', links: [] },
        { label: 'Instana', links: [] },
        { label: 'OpenTracing', links: [] },
      ],
    },
    {
      label: 'Gerenciamento de Logs',
      children: [
        { label: 'Elastic Stack', links: [] },
        { label: 'Graylog', links: [] },
        { label: 'Splunk', links: [] },
        { label: 'Papertrail', links: [] },
      ],
    },
  ],
};
