import React, { FunctionComponent } from 'react'
import { Layout, Row, Col, Tabs } from 'antd'
import { UnorderedListOutlined, DatabaseOutlined } from '@ant-design/icons'

import './App.scss'

import SearchForm from '../SearchForm'
import SearchListContainer from '../SearchListContainer'

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
                <SearchListContainer />
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
