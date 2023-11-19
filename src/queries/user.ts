import prisma from '@/../lib/prisma';

const getUser = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
      select: {
        id: true,
        email: true,
        name: true,
        isAdmin: true,
        organization: true,
        organizationId: true,
      },
    });

    return user;
  } catch (e) {
    console.log('ERROR', e);
  }
};

interface AuthorizeUser {
  email?: string;
  password?: string;
}
const authorizeUser = async ({ email, password }: AuthorizeUser) => {
  if (!email || !password) {
    console.log('please provide credentials');
    return false;
  }

  try {
    const user = await prisma.user.findUniqueOrThrow({
      where: {
        email,
        password,
      },
    });

    return user;
  } catch (error: any) {
    console.log('FAIL', error);
    return false;
  }
};

export { getUser, authorizeUser };
