import { Card } from "@mantine/core";
import React from "react";
import Layout from "../../layouts/Default";
import { TEXT } from "../../constants/text";

const ClassRoomIndex = () => {
    return (
        <Layout title={TEXT.CLASS_ROOM.PAGE.TITLE}>
            <Card shadow="sm">
                Class room
            </Card>
        </Layout>
    )
}

export default ClassRoomIndex;