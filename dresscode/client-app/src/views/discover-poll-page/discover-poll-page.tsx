import React from "react";
import './discover-poll-page.css';
import {
    Checkbox,
    Grid,
    Header,
    Icon,
    Image,
    Menu,
    Segment,
    Sidebar,
  } from 'semantic-ui-react'

const DiscoverPollPage = () => {
    const [visible, setVisible] = React.useState(false)

    return (
        <div>
            <h1>Discover Poll Page</h1>
        <Grid columns={1}>
        <Grid.Column>
            <Checkbox
            checked={visible}
            label={{ children: <code>visible</code> }}
            onChange={(e, data: any) => setVisible(data.checked)}
            />
        </Grid.Column>

        <Grid.Column>
            <Sidebar.Pushable as={Segment}>
            <Sidebar
                as={Menu}
                animation='overlay'
                icon='labeled'
                inverted
                onHide={() => setVisible(false)}
                vertical
                visible={visible}
                width='thin'
            >
                <Menu.Item as='a'>
                <Icon name='home' />
                Home
                </Menu.Item>
                <Menu.Item as='a'>
                <Icon name='gamepad' />
                Games
                </Menu.Item>
                <Menu.Item as='a'>
                <Icon name='camera' />
                Channels
                </Menu.Item>
            </Sidebar>

            <Sidebar.Pusher>
            {/* <h1>Hello world</h1>
                <Segment basic>
                <Header as='h3'>Application Content</Header>
                <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
                </Segment> */}
            </Sidebar.Pusher>
            </Sidebar.Pushable>
        </Grid.Column>
        </Grid>
        </div>
    )
}

export default DiscoverPollPage;