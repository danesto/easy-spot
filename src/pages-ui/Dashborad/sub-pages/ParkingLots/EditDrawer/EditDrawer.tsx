import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
} from '@/components/Chakra';

function EditDrawer({ handleToggleDrawer, isDrawerOpen }: any) {
  return (
    <Drawer
      placement="right"
      isOpen={isDrawerOpen}
      onClose={handleToggleDrawer}
      size="md"
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerBody>Edit or create Parking lot form goes here</DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}

export default EditDrawer;
