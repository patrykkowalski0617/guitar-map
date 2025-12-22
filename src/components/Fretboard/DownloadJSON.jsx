const DownloadJSON = ({ shape }) => {
  const downloadJSON = (data, filename = "shape-pattern.json") => {
    const jsonString = JSON.stringify(data, null, 2);

    const blob = new Blob([jsonString], { type: "application/json" });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = filename;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleExport = () => {
    // Możesz wzbogacić JSON o dodatkowe metadane, np. tonację
    const dataToSave = {
      notes: shape,
    };

    downloadJSON(dataToSave, `caged-shape.json`);
  };

  return (
    <div style={{ marginTop: "20px", textAlign: "center" }}>
      <button
        onClick={handleExport}
        disabled={shape.length === 0}
        style={{
          padding: "10px 20px",
          backgroundColor: shape.length > 0 ? "#4CAF50" : "#ccc",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: shape.length > 0 ? "pointer" : "not-allowed",
        }}
      >
        Download JSON
      </button>
    </div>
  );
};

export default DownloadJSON;
