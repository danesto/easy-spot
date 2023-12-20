import { Session, getServerSession } from 'next-auth';
import prisma from '../../lib/prisma';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { SlackIntegration } from '@prisma/client';

const createIntegration = async ({
  channelId,
  channel,
  webhookUrl,
}: Pick<SlackIntegration, 'channel' | 'channelId' | 'webhookUrl'>) => {
  const { user } = (await getServerSession(authOptions)) as Session;

  try {
    const integration = await prisma.slackIntegration.create({
      data: {
        organizationId: user?.organizationId as number,
        channel,
        channelId,
        webhookUrl,
      },
    });

    return integration;
  } catch (error) {
    console.log(error);
  }
};

export { createIntegration };
