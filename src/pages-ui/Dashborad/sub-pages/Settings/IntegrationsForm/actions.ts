'use server';

import { createIntegration } from '@/queries/integrations';
import { App, LogLevel } from '@slack/bolt';

const app = new App({
  token:
    'xapp-1-A067USX76LE-6378595664916-437f443ba40638fc9d968882cd208fa77310a4e66fec3039ea847ebf9073961c',
  clientSecret: process.env.SLACK_CLIENT_SECRET,
  signingSecret: 'e4d445daed94692345a3426f25314dbb',
  // LogLevel can be imported and used to make debugging simpler
  logLevel: LogLevel.DEBUG,
  stateSecret: 'secer',
  scopes: ['incoming-webhook'],
  processBeforeResponse: true,
});

const integrateSlackWebhook = async (code: string) => {
  //   const urlencoded = new URLSearchParams();
  //   urlencoded.append(
  //     'client_id',
  //     process.env.NEXT_PUBLIC_SLACK_CLIENT_ID as string
  //   );
  //   urlencoded.append('client_secret', process.env.SLACK_CLIENT_SECRET as string);
  //   urlencoded.append('code', code);
  //   urlencoded.append('redirect_uri', process.env.SLACK_REDIRECT_URI as string);
  //   try {
  //     // const response = await fetch('https://slack.com/api/oauth.v2.access', {
  //     //   method: 'POST',
  //     //   headers: {
  //     //     'Content-Type': 'application/x-www-form-urlencoded',
  //     //   },
  //     //   body: urlencoded,
  //     //   redirect: 'follow',
  //     // });
  //     const response = app.client.oauth.v2.access({
  //       code: code,
  //       client_id: process.env.NEXT_PUBLIC_SLACK_CLIENT_ID as string,
  //       client_secret: process.env.SLACK_CLIENT_SECRET as string,
  //       scopes: ['incoming-webhook'],
  //     });
  //     console.log('RESPONSE', await response);
  //     if (response) {
  //       const { channel, channel_id, url } = (response as any).incoming_webhook;
  //       try {
  //         const integration = createIntegration({
  //           channel,
  //           channelId: channel_id,
  //           webhookUrl: url,
  //         });
  //         return integration;
  //       } catch (prismaError) {
  //         console.log('Prisma create failed: ', prismaError);
  //       }
  //     }
  //   } catch (e) {
  //     console.log('Integration error', e);
  //   }
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

  var urlencoded = new URLSearchParams();
  urlencoded.append('client_id', '6258994789863.6266915244694');
  urlencoded.append('client_secret', 'c9bd3c96eaa5a30a6a00030de90465b2');
  urlencoded.append(
    'code',
    '6258994789863.6399216172048.263c249a0f861c9fcfd2a077b7118055fe2925c523b5a521675a2e210280801f'
  );
  urlencoded.append(
    'redirect_uri',
    'https://easy-spot.vercel.app/dashboard/settings?tab=notifications'
  );

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: urlencoded,
  };

  fetch('https://slack.com/api/oauth.v2.access', requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log('error', error));
};

export { integrateSlackWebhook };
