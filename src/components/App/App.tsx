import React, { FunctionComponent, useEffect, useState } from 'react'
import { Layout, Row, Col, Tabs } from 'antd'
import { UnorderedListOutlined, DatabaseOutlined } from '@ant-design/icons'

import './App.scss'

import { getResource } from '../../utils/api'
import SearchForm from '../SearchForm'
import SearchList from '../SearchList'

import { IListItem, IListData } from '../../models'

const App: FunctionComponent = () => {
  const [listData, setListData] = useState<IListItem[]>([])
  const [pageCount, setPageCount] = useState<number>(1)

  useEffect(() => {
    getResource('monkey', pageCount).then((data: IListData) => {
      console.log(data)
      if (data.items) {
        const nextListData = data.items
        setListData((state) => [...state, ...nextListData])
      }
    })
  }, [pageCount])

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
