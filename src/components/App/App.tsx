import React, { FunctionComponent } from 'react'
import { Layout, Row, Col, Tabs } from 'antd'
import { UnorderedListOutlined, DatabaseOutlined } from '@ant-design/icons'

import './App.scss'

import SearchForm from '../SearchForm'
import SearchList from '../SearchList'

import { IListItem } from '../../models'

const listData: IListItem[] = []
for (let i = 0; i < 3; i++) {
  listData.push({
    href: 'https://ant.design',
    title: `ant design part ${i}`,
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    description:
      'Ant Design, a design language for background applications, is refined by Ant UED Team.',
    content:
      'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
  })
}

const App: FunctionComponent = () => {
  return (
    <Layout className="app">
      <Layout.Header className="app__header">
        <SearchForm />
      </Layout.Header>
      <Layout.Content className="app__content">
        <Row justify="center">
          <Col span={24}>
            <Tabs
              defaultActiveKey="1"
              centered
              onChange={() => console.log('tab changed')}
            >
              <Tabs.TabPane
                tab={
                  <span>
                    <UnorderedListOutlined />
                    Search Results
                  </span>
                }
                key="1"
              >
                <SearchList listData={listData} />
              </Tabs.TabPane>

              <Tabs.TabPane
                tab={
                  <span>
                    <DatabaseOutlined />
                    Bookmarks
                  </span>
                }
                key="2"
              >
                Content of Tab Pane 2
              </Tabs.TabPane>
            </Tabs>
          </Col>
        </Row>
      </Layout.Content>
    </Layout>
  )
}

export default App
