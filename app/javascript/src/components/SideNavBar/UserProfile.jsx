import React from "react";

import { Avatar } from "@bigbinary/neetoui";

const UserProfile = () => (
  <div>
    <Avatar
      className="bg-purple-400"
      size="large"
      user={{
        name: "Pradipta Dash",
      }}
    />
  </div>
);

export default UserProfile;
