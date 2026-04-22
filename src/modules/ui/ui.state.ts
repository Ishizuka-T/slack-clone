import { atom, useAtom } from "jotai";

const showCreateWorkspaceModalAtom = atom<boolean>(false);
const showCreateChannnelModalAtom = atom<boolean>(false);

export const useUiStore = () => {
  const [showCreateWorkspaceModal, setShowCreateWorkspaceModal] = useAtom(
    showCreateWorkspaceModalAtom
  );

  const [showCreateChannelModal, setShowCreateChannelModal] = useAtom(
    showCreateChannnelModalAtom
  );

  return {
    showCreateWorkspaceModal,
    setShowCreateWorkspaceModal,
    showCreateChannelModal,
    setShowCreateChannelModal,
  };
};
