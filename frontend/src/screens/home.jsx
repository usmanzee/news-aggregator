import React, { useState, useEffect } from "react";
import {
  Button,
  Col,
  Row,
  Input,
  Tooltip,
  Card,
  Modal,
  DatePicker,
  Form,
  Select,
  Tag,
  Typography,
} from "antd";
import {
  SearchOutlined,
  FilterOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";

import NotFoundImage from "../../src/assets/not_found.png";
import { useSelector, useDispatch } from "react-redux";
import {
  getCategoriesAction,
  getSourcesAction,
  getNewsFeedAction,
} from "../redux/actions";
import { useNavigate } from "react-router-dom";
import moment from "moment";

const { Search } = Input;
const { Meta } = Card;
const { Title } = Typography;
const { RangePicker } = DatePicker;

function Home(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [filterForm] = Form.useForm();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSources, setSelectedSources] = useState([]);

  const [searchedCategory, setSearchedCategory] = useState(null);
  const [searchedSources, setSearchedSources] = useState([]);

  const [searchedFromDate, setSearchedFromDate] = useState("");
  const [searchedToDate, setSearchedToDate] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const categoriesLoading = useSelector((state) => state.categories.loading);
  const categories = useSelector((state) => state.categories.list);

  const sourcesLoading = useSelector((state) => state.sources.loading);
  const sources = useSelector((state) => state.sources.list);

  const newsFeedLoading = useSelector((state) => state.newsFeed.loading);
  const newsFeed = useSelector((state) => state.newsFeed.list);

  useEffect(() => {
    dispatch(getNewsFeedAction(navigate));
  }, [dispatch, navigate]);

  useEffect(() => {
    if (categories.length === 0) {
      dispatch(getCategoriesAction(navigate));
    }
  }, [categories, dispatch, navigate]);

  useEffect(() => {
    if (sources.length === 0) {
      dispatch(getSourcesAction(navigate));
    }
  }, [sources, dispatch, navigate]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    filterForm.submit();
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onSearch = (value) => {
    setSearchQuery(value);
    if (!value && !searchedSources.length) {
      filterForm.resetFields(["date_range"]);
    }
    dispatch(
      getNewsFeedAction(navigate, value, "", "", "", selectedSources.join(","))
    );
  };

  const handleFilterFormSubmit = (values) => {
    var fDate = "";
    var tDate = "";
    var category = "";
    var sources = "";

    if (values["date_range"]) {
      fDate = moment(values["date_range"][0]["$d"]).format("YYYY-MM-DD");
      tDate = moment(values["date_range"][1]["$d"]).format("YYYY-MM-DD");
      setSearchedFromDate(fDate);
      setSearchedToDate(tDate);
    } else {
      setSearchedFromDate(null);
      setSearchedToDate(null);
    }
    if (values["category"]) {
      category = values["category"];
      setSearchedCategory(values["category"]);
    } else {
      setSearchedCategory(null);
    }

    if (values["sources"]) {
      setSearchedSources(values["sources"]);
      sources = values["sources"].join(",");
    }
    dispatch(
      getNewsFeedAction(navigate, searchQuery, fDate, tDate, category, sources)
    );
  };

  const renderLoadingCard = () => {
    return (
      <Col md={6} sm={24} xs={24} gutter={16}>
        <Card style={{ width: 300, marginTop: 16 }} loading={true}>
          <Meta title="Card title" description="This is the description" />
        </Card>
      </Col>
    );
  };

  const renderNewsCard = (news) => {
    return (
      <Col md={6} sm={24} xs={24} gutter={16}>
        <Card
          title={
            <a
              target="_blank"
              href={news.url}
              rel="noreferrer"
              style={{ color: "#69a4f6" }}
            >
              {news.title}
            </a>
          }
          bordered={false}
          style={{ marginBottom: "16px", width: "100%" }}
          headStyle={{ padding: "0px 16px" }}
          bodyStyle={{ padding: "16px" }}
        >
          <div className="card">
            <img
              alt=""
              src={news.urlToImage ? news.urlToImage : NotFoundImage}
            />
            <p style={{ color: "#515050" }}>
              {news.description ? (
                news.description
              ) : (
                <a target="_blank" href={news.url} rel="noreferrer">
                  More details
                </a>
              )}
            </p>
            <div className="actions">
              <span className="badge">{news.source.name}</span>
              <span>
                {<ClockCircleOutlined />}
                {` ${news.timeAt}`}
              </span>
            </div>
          </div>
        </Card>
      </Col>
    );
  };
  return (
    <>
      <section>
        <Row
          justify="center"
          style={{ marginTop: "14px", marginBottom: "8px" }}
        >
          <Col md={8} sm={24} xs={24}>
            <div className="search-feild">
              <Search
                className="search-input"
                size="large"
                placeholder="Search News"
                prefix={<SearchOutlined />}
                onSearch={onSearch}
                allowClear={true}
              />
              <Tooltip title="Filter">
                <Button
                  secodary
                  width={"44px"}
                  icon={<FilterOutlined />}
                  onClick={showModal}
                />
              </Tooltip>
            </div>
          </Col>
        </Row>
        <Row justify="center" gutter={16} style={{ marginBottom: "16px" }}>
          <Col md={8} sm={24} xs={24}>
            <div>
              {searchedSources.length ? (
                <div>
                  Sources:{" "}
                  {searchedSources.map((selectedSource) => (
                    <Tag>{selectedSource}</Tag>
                  ))}
                </div>
              ) : (
                ""
              )}
            </div>
            <div>
              {searchedCategory ? (
                <div>
                  Category: <Tag>{searchedCategory}</Tag>
                </div>
              ) : (
                ""
              )}
            </div>
            <div style={{ marginTop: "4px" }}>
              {searchedFromDate && searchedToDate ? (
                <div>
                  Date:{" "}
                  <span
                    style={{ fontSize: "12px" }}
                  >{`${searchedFromDate} - ${searchedToDate}`}</span>
                </div>
              ) : (
                ""
              )}
            </div>
          </Col>
        </Row>
      </section>
      <section>
        <Row gutter={16}>
          {newsFeedLoading ? (
            [1, 2, 3, 4, 5, 6, 7].map(() => renderLoadingCard())
          ) : (
            <>
              {newsFeed.length ? (
                newsFeed.map((news) => renderNewsCard(news))
              ) : (
                <Row>
                  <Col span={24} className="no-record">
                    <Title>No Result Found!</Title>
                  </Col>
                </Row>
              )}
            </>
          )}
        </Row>
      </section>

      <Modal
        title="News Filters"
        open={isModalOpen}
        okText={"Search"}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Row>
          <Col span={24}>
            <Form
              form={filterForm}
              onFinish={handleFilterFormSubmit}
              layout="vertical"
              className="row-col"
            >
              <Form.Item
                label="Select Sources"
                name="sources"
                rules={[
                  {
                    required: false,
                  },
                ]}
              >
                <Select
                  mode="multiple"
                  allowClear
                  placeholder="Select Sources"
                  loading={sourcesLoading}
                  onChange={(values) => {
                    filterForm.resetFields(["category"]);
                    if (!searchQuery && !values.length) {
                      filterForm.resetFields(["date_range"]);
                    }
                    setSelectedSources(values);
                  }}
                >
                  {sources.map((source) => {
                    return (
                      <Select.Option value={source.id} allowClear={true}>
                        {source.name}
                      </Select.Option>
                    );
                  })}
                </Select>
              </Form.Item>

              <Form.Item
                label="Select Category"
                name="category"
                rules={[
                  {
                    required: false,
                  },
                ]}
              >
                <Select
                  allowClear
                  loading={categoriesLoading}
                  placeholder="Select Category"
                  onChange={(value) => {
                    setSelectedCategory(value ? value : null);
                  }}
                  disabled={selectedSources.length || searchQuery}
                >
                  {categories.map((category) => {
                    return (
                      <Select.Option value={category.value} allowClear={true}>
                        {category.title}
                      </Select.Option>
                    );
                  })}
                </Select>
              </Form.Item>
              <Form.Item
                label="Select From and To date"
                name="date_range"
                rules={[
                  {
                    required: false,
                  },
                ]}
              >
                <RangePicker
                  style={{ width: "100%" }}
                  allowClear={true}
                  disabled={!selectedSources.length && !searchQuery}
                />
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Modal>
    </>
  );
}

export default Home;
