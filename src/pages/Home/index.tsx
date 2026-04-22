import WorkspaceSelector from "./WorkspaceSelector";
import "./Home.css";
import Sidebar from "./Sidebar";
import MainContent from "./MainContent";
import { useCurrentUserStore } from "../../modules/auth/current-user.state";
import { useEffect, useState } from "react";
import type { Workspace } from "../../modules/workspaces/workspace.entity";
import { workspaceRepository } from "../../modules/workspaces/workspace.repository";
import { useParams } from "react-router-dom";
import { channelRepository } from "../../modules/channels/channel.repository";
import type { Channel } from "../../modules/channels/channel.entity";

function Home() {
  const { currentUser } = useCurrentUserStore();
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [channels, setChannels] = useState<Channel[]>([]);
  const params = useParams();
  const { workspaceId, channelId } = params;
  const selectedWorkspace = workspaces.find(
    (workspace) => workspace.id == workspaceId,
  );
  const selectedChannel = channels.find((channel) => channel.id == channelId);

  useEffect(() => {
    fetchWorkspaces();
  }, []);

  useEffect(() => {
    fetchChannels();
  }, [workspaceId]);

  const fetchWorkspaces = async () => {
    try {
      const workspaces = await workspaceRepository.find();
      setWorkspaces(workspaces);
    } catch (error) {
      console.error(`ワークスペースの作成に失敗しました`, error);
    }
  };

  const fetchChannels = async () => {
    try {
      const channels = await channelRepository.find(workspaceId!);
      setChannels(channels);
    } catch (error) {
      console.error("チャンネルの取得に失敗しました", error);
    }
  };

  return (
    <div className="slack-container">
      <WorkspaceSelector
        workspaces={workspaces}
        setWorkspaces={setWorkspaces}
        selectedWorkspaceId={workspaceId}
      />
      {selectedWorkspace != null && selectedChannel != null ? (
        <>
          <Sidebar
            selectedWorkspace={selectedWorkspace}
            channels={channels}
            selectedChannelId={channelId!}
            setChannels={setChannels}
          />
          <MainContent
            selectedChannel={selectedChannel}
            channels={channels}
            setChannels={setChannels}
            selectedWorkspaceId={workspaceId!}
          />
        </>
      ) : (
        <div className="sidebar" />
      )}
    </div>
  );
}

export default Home;
