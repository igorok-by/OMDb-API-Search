import React, { FunctionComponent, useEffect, useState } from 'react'
import { Layout, Row, Col, Tabs } from 'antd'
import { UnorderedListOutlined, DatabaseOutlined } from '@ant-design/icons'

import './App.scss'

import { getResource } from '../../utils/api'
import SearchForm from '../SearchForm'
import SearchList from '../SearchList'

import { IFilmItem, IFilmsData } from '../../models'

const App: FunctionComponent = () => {
  // const [filmsData, setFilmsData] = useState<IFilmItem[]>([])
  // const [pageCount, setPageCount] = useState<number>(1)

  // useEffect(() => {
  //   getResource('monkey', pageCount).then((data: IFilmsData) => {
  //     console.log(data)
  //     if (data.items) {
  //       const nextFilmsData = data.items
  //       setFilmsData((state) => [...state, ...nextFilmsData])
  //     }
  //   })
  // }, [pageCount])

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
                <SearchList />
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
