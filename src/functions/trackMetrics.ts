import { Metric, QueryMetrics, Successful, Failed } from '../types';

const trackMetrics = (
  metricType: string,
  metric: Metric,
  setQueryMetrics: React.Dispatch<React.SetStateAction<QueryMetrics>>
) => {
  setQueryMetrics(queryMetrics => {
    const newQueryMetrics = {
      successful: [...queryMetrics.successful],
      failed: [...queryMetrics.failed],
      retries: [...queryMetrics.retries],
    };

    switch (metricType) {
      case 'successful':
        newQueryMetrics.successful.push(metric as Successful);
        break;
      case 'failed':
        newQueryMetrics.failed.push(metric as Failed);
        break;
      case 'retry':
        newQueryMetrics.retries.push(metric as Failed);
        break;
      default:
        break;
    }

    return newQueryMetrics;
  });
};

export default trackMetrics;
