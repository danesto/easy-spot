import { Image, Link } from '@/components/Chakra';
import NextLink from 'next/link';
import SettingsSection from '../SettingsSection';
import styles from '../settings.module.scss';

const SLACK_CLIENT_ID = process.env.SLACK_CLIENT_ID;

function IntegrationsForm() {
  return (
    <SettingsSection
      title="Slack notifications"
      subtitle="You'll receieve notifications directly on your Slack selected channel if parking spot gets released"
    >
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
    </SettingsSection>
  );
}

export default IntegrationsForm;
