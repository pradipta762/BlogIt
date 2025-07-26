import React, { useEffect, useRef, useState } from "react";

import { LeftArrow } from "neetoicons";
import { Avatar, Typography, Button } from "neetoui";
import { useTranslation } from "react-i18next";
import { getFromLocalStorage } from "utils/storage";

const UserProfile = ({ handleLogout, name, email }) => {
  const userName = getFromLocalStorage("authUserName");
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const menuRef = useRef();

  const { t } = useTranslation();

  useEffect(() => {
    const handleClickOutside = event => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  return (
    <div className="relative">
      <Avatar
        showTooltip
        className="cursor-pointer"
        ref={menuRef}
        size="large"
        user={{
          imageUrl: "https://avatars.githubusercontent.com/u/116185668?v=4",
          name: userName,
        }}
        onClick={toggleMenu}
      />
      {isMenuVisible && (
        <div className="absolute -top-12 left-full z-[999] ml-5 rounded-md border border-gray-300 bg-white p-3 py-1 shadow-xl">
          <div className="flex items-center space-x-3 border-b p-2">
            <Avatar
              size="medium"
              user={{
                imageUrl:
                  "https://avatars.githubusercontent.com/u/116185668?v=4",
                name: userName,
              }}
            />
            <div>
              <Typography className="font-semibold">{name}</Typography>
              <Typography className="text-xs text-gray-400">{email}</Typography>
            </div>
          </div>
          <Button
            fullWidth
            className="flex p-3 text-gray-800"
            icon={LeftArrow}
            iconPosition="left"
            label={t("labels.logOut")}
            size="large"
            style="text"
            onClick={handleLogout}
          />
        </div>
      )}
    </div>
  );
};

export default UserProfile;
