import Header from "../components/Header"
export default ({ children }) => {
    return <main style={{ border: '4px dashed green' }}>
    <Header />{children}</main>
}
