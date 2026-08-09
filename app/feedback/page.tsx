import { redirect } from 'next/navigation';
import { isExperimentEnabled } from '@/utils/experiments';

export default async function FeedbackRedirectPage({
  searchParams,
}: {
  searchParams: Promise<{ code?: string }>;
}) {
  const params = await searchParams;
  const roomCode = params?.code;
  const isFeatureCampaign = isExperimentEnabled('FEATURE_CAMPAIGN_ENABLED');
  const isFeedbackCampaign = isExperimentEnabled('FEEDBACK_CAMPAIGN_ENABLED');

  const query = roomCode ? `?code=${roomCode}` : '';

  if (isFeatureCampaign) {
    redirect(`/f/feature-request${query}`);
  } else if (isFeedbackCampaign) {
    redirect(`/f/clipboard-feedback${query}`);
  } else {
    redirect('/');
  }
}
