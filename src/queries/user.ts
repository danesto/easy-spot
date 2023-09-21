import prisma from '@/../lib/prisma';

const getUser = async () => {
  return await prisma.user.findMany();
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
    return false;
  }
};

export { getUser, authorizeUser };
