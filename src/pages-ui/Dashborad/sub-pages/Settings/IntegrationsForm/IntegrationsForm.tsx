import { Alert, Button, Image, Link, Text } from '@/components/Chakra';
import NextLink from 'next/link';
import SettingsSection from '../SettingsSection';
import styles from '../settings.module.scss';
import { useSearchParams } from 'next/navigation';
import { useTransition } from 'react';
import { integrateSlackWebhook } from './actions';

function IntegrationsForm() {
  const [isPending, startTransition] = useTransition();

  const SLACK_CLIENT_ID = process.env.NEXT_PUBLIC_SLACK_CLIENT_ID;
  const searchParams = useSearchParams();
  const slackAuthCode = searchParams.get('code');

  const handleFinihSlackIntegration = () => {
    if (slackAuthCode) {
      startTransition(async () => {
        const data = await integrateSlackWebhook(slackAuthCode);

        console.log('response', data);
      });
    }
  };

  return (
    <SettingsSection
      title="Slack notifications"
      subtitle="You'll receieve notifications directly on your Slack selected channel if parking spot gets released"
    >
      {slackAuthCode ? (
        <Alert
          colorScheme="yellow"
          variant="left-accent"
          flexDir="column"
          gap="20px"
          alignItems="flex-start"
        >
          <Text>
            You have authorized your Slack organization,{' '}
            <span>
              <strong>please click button below</strong>{' '}
            </span>
            to finish things up and install the app.
          </Text>
          <Button onClick={handleFinihSlackIntegration} colorScheme="blue">
            Finish setting up
          </Button>
        </Alert>
      ) : (
        <Link
          as={NextLink}
          href={`https://slack.com/oauth/v2/authorize?client_id=${SLACK_CLIENT_ID}&scope=incoming-webhook&user_scope=`}
          className={styles.slackLink}
        >
          <Image
            alt="Add to Slack"
            height="40px"
            width="139px"
            src="https://platform.slack-edge.com/img/add_to_slack.png"
            srcSet="https://platform.slack-edge.com/img/add_to_slack.png 1x, https://platform.slack-edge.com/img/add_to_slack@2x.png 2x"
          />
        </Link>
      )}
    </SettingsSection>
  );
}

export default IntegrationsForm;
