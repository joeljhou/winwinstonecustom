from PIL import Image
import sys

# 确保安装了PIL库
try:
    from PIL import Image
except ImportError:
    print("需要安装PIL库，请运行: pip install pillow")
    sys.exit(1)

def create_favicon(input_path, output_path, size=(32, 32)):
    """创建适合的favicon，调整尺寸并确保清晰度"""
    try:
        # 打开图片
        image = Image.open(input_path)
        
        # 调整尺寸
        favicon = image.resize(size, Image.LANCZOS)
        
        # 创建白色背景
        background = Image.new("RGB", size, (255, 255, 255))
        
        # 粘贴并保存
        if favicon.mode == "RGBA":
            background.paste(favicon, (0, 0), favicon)
        else:
            background.paste(favicon, (0, 0))
        
        background.save(output_path, "PNG")
        
        print(f"成功创建favicon: {input_path} -> {output_path}")
        print(f"新尺寸: {size}")
    except Exception as e:
        print(f"处理失败: {e}")
        sys.exit(1)

if __name__ == "__main__":
    input_file = "assets/images/logo.png"
    output_file = "assets/images/favicon.png"
    
    create_favicon(input_file, output_file, size=(32, 32))