import React, { useState } from "react";

import { sidebarLinks } from "../../../data/dashboard-links";
import { logout } from "../../../services/operations/authAPI";
import { useDispatch, useSelector } from "react-redux";
import SidebarLinks from "./SidebarLinks";
import { useNavigate } from "react-router-dom";
import { VscSignOut } from "react-icons/vsc";
import ConfirmationModal from "../../common/ConfirmationModal";
const Sidebar = () => {
    const { user, loading: profileLoading } = useSelector((state) => state.profile);
    const { loading: authLoading } = useSelector((state) => state.auth);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    // starting me mere pass data nhi hai ki kya show hoga confirmation modal me
    // but as we click on button we set the data 
    // to keep track of confirmation modal
    const [confirmationModal, setConfirmationModal] = useState(null)

    if (profileLoading || authLoading) {
        return (
            <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
                <div className="spinner"> Loading...</div>
            </div>
        )
    }

    return (
        <div >
            <div className="flex min-w-[222px] flex-col border-r-[1px] border-r-richblack-700
             h-[100vh] bg-richblack-800 py-10">
                <div className="flex flex-col">
                    {

                        sidebarLinks.map((link) => {
                            // If the link is role-specific and doesn't match the user's role, skip it
                            if (link.type && user?.accountType !== link.type) return null;

                            return (
                                <SidebarLinks
                                    key={link.id}
                                    link={link}
                                    iconName={link.icon}
                                />
                            );
                        })



                    }
                </div>

                <div className="mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-richblack-700" />

                <div className="flex flex-col">
                    <SidebarLinks
                        link={{ name: "Setting", path: "dashboard/settings" }}
                        iconName="VscSettingsGear"

                    />
                    {/* Now we create a modal for logout */}

                    <button
                        onClick={() =>
                            // setting what we do when click on button 
                            setConfirmationModal({
                                text1: "Are you sure?",
                                text2: "You will be logged out of your account.",
                                btn1Text: "Logout",
                                btn2Text: "Cancel",
                                btn1Handler: () => dispatch(logout(navigate)),
                                btn2Handler: () => setConfirmationModal(null),
                            })
                        }
                        className="px-8 py-2 text-sm font-medium text-richblack-300"
                    >

                        <div className="flex items-center gap-x-2">
                            <VscSignOut className="text-lg" />
                            <span>Logout</span>
                        </div>

                    </button>

                </div>
            </div>

            {/* agr button pe click kiya to modal visible hoga nhi to nhi hoga */}

            {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}


        </div>
    )
}

export default Sidebar