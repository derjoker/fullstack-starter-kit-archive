import Layout from '../components/layout'
import Table from '../components/table/Table'

const data = [
  {name: 'name', email: 'email', age: 7}
]

export default () => (
  <Layout>
    <Table data={data} />
  </Layout>
)
