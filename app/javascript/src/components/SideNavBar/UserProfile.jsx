import React, { useRef } from "react";

import { Avatar, Popover, Typography } from "@bigbinary/neetoui";
import { getFromLocalStorage } from "utils/storage";

const UserProfile = () => {
  const userName = getFromLocalStorage("authUserName");
  const ref = useRef(null);

  return (
    <div>
      <Avatar
        ref={ref}
        size="large"
        user={{
          imageUrl: "https://avatars.githubusercontent.com/u/116185668?v=4",
          name: userName,
        }}
      />
      <Popover reference={ref}>
        <Typography>{userName}</Typography>
      </Popover>
    </div>
  );
};

export default UserProfile;
