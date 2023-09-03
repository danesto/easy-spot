import prisma from '@/../lib/prisma';

const getUser = async () => {
  return await prisma.user.findMany();
};

export { getUser };
